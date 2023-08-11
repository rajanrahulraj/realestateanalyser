package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.RealEstateNYCinfo;
import com.example.realestateanalyser.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RealEstateDao {
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

	public List<RealEstateNYCinfo> buildingInfoByAddress(String address) {
		Session session = sessionFactory.openSession();
		try{
			final List<Object[]> rows = (List<Object[]>) session.createNativeQuery(
					String.format("""
								SELECT d.staddr, n.bble, n.stories, n.fulval, n.year, bl.latitude, bl.longitude
									FROM real_estate_data d join
										 real_estate_nyc n on d.bble = n.bble
										 left join
										 building_locations bl on d.bble= bl.bble
									WHERE d.bble = n.bble
									AND staddr = '%s'
									ORDER BY year;
								"""
							, address)
			).list();
			List<RealEstateNYCinfo> buildingInfoList = getRealEstateNYCinfo(rows);
			return buildingInfoList;
		} catch(Exception e){
			return new ArrayList<RealEstateNYCinfo>();
		}

	}

	public List<RealEstateNYCinfo> buildingsWithinZone(int zoneID) {
		Session session = sessionFactory.openSession();
		final List<Object[]> rows = (List<Object[]>) session.createNativeQuery(
				String.format("""
									SELECT d.staddr, n.bble, n.stories, n.fulval, n.year, bl.latitude, bl.longitude
										FROM real_estate_data d join
											 (SELECT n.bble,SUBSTRING_INDEX(GROUP_CONCAT(n.stories separator ','), ',', 1) stories, SUBSTRING_INDEX(GROUP_CONCAT(n.fulval separator ','), ',', 1) fulval, max(n.year) as year, SUBSTRING_INDEX(GROUP_CONCAT(n.locationid separator ','), ',', 1) locationid FROM realestateanalyser.real_estate_nyc n group by n.bble) n on d.bble = n.bble
											 left join
											 building_locations bl on d.bble= bl.bble
									WHERE n.bble = d.bble
									  AND  n.locationid = %d;
								"""
						, zoneID)
		).list();
		List<RealEstateNYCinfo> buildingInfoList = getRealEstateNYCinfo(rows);
		return buildingInfoList;
	}

	public List<RealEstateNYCinfo> usersFavoriteBuildings(long userID) {
		Session session = sessionFactory.openSession();
		final List<Object[]> rows = (List<Object[]>) session.createNativeQuery(
				String.format("""
								SELECT d.staddr, n.bble, n.stories, n.fulval, n.year
								FROM real_estate_data AS d,
								     real_estate_nyc AS n
								WHERE d.bble = n.bble
								  AND n.bble IN (SELECT L.building_bble
								               FROM user_building_link as L
								               WHERE userid = %d)
								ORDER BY year;
								""",
						userID)
		).list();
		List<RealEstateNYCinfo> buildingInfoList = getRealEstateNYCinfo(rows);
		return buildingInfoList;
	}

		private static List<RealEstateNYCinfo> getRealEstateNYCinfo (List < Object[]>rows){
			List<RealEstateNYCinfo> buildingInfoList = new ArrayList<>();
			for (Object[] columns : rows) {
				RealEstateNYCinfo building = new RealEstateNYCinfo(
							(String) columns[0],
							(String) columns[1],
							(String) columns[2],
							(String) columns[3],
							(Integer) columns[4]
					);

				if(columns.length == 7){
					building.setLatitude((String) columns[5]);
					building.setLongitude((String) columns[6]);
				}

				buildingInfoList.add(building);
			}
			return buildingInfoList;
		}
	}
