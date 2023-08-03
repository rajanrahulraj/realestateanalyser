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
		final List<Object[]> rows = (List<Object[]>) session.createNativeQuery(
				String.format("""
								SELECT d.staddr, n.bble, n.stories, n.fulval, n.year
								FROM real_estate_data AS d,
								     real_estate_nyc AS n
								WHERE d.bble = n.bble
								AND staddr = '%s'
								ORDER BY year;
								"""
						, address)
		).list();
		List<RealEstateNYCinfo> buildingInfoList = getRealEstateNYCinfo(rows);
		return buildingInfoList;
	}

	public List<RealEstateNYCinfo> buildingsWithinZone(int zoneID) {
		Session session = sessionFactory.openSession();
		final List<Object[]> rows = (List<Object[]>) session.createNativeQuery(
				String.format("""
								SELECT d.staddr, n.bble, n.stories, n.fulval, n.year
								FROM real_estate_nyc AS n,
								     real_estate_data AS d
								WHERE n.bble = d.bble
								  AND n.bble IN (SELECT bble
								               FROM real_estate_data
								               WHERE block = %d)
								ORDER BY bble, year;
																"""
						, zoneID)
		).list();
		List<RealEstateNYCinfo> buildingInfoList = getRealEstateNYCinfo(rows);
		return buildingInfoList;
	}

	private static List<RealEstateNYCinfo> getRealEstateNYCinfo(List<Object[]> rows) {
		List<RealEstateNYCinfo> buildingInfoList = new ArrayList<>();
		for (Object[] columns : rows) {
			RealEstateNYCinfo building = new RealEstateNYCinfo(
					(String) columns[0],
					(String) columns[1],
					(String) columns[2],
					(String) columns[3],
					(Integer) columns[4]
			);
			buildingInfoList.add(building);
		}
		return buildingInfoList;
	}
}
