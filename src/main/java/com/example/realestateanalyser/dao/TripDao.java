package com.example.realestateanalyser.dao;

import com.example.realestateanalyser.pojo.TripAggregateInfo;
import com.example.realestateanalyser.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class TripDao {
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

	public TripAggregateInfo pickupAggregates(int locationID,
	                                          Date startDate,
	                                          Date endDate) {

		return getAggregateInfo(locationID, startDate, endDate, true);
	}

	public TripAggregateInfo dropoffAggregates(int locationID,
	                                          Date startDate,
	                                          Date endDate) {

		return getAggregateInfo(locationID, startDate, endDate, false);
	}

	private TripAggregateInfo getAggregateInfo(int locationID,
	                                           Date startDate,
	                                           Date endDate,
	                                           boolean isPickUp) {
		Session session = sessionFactory.openSession();
		final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		final Object[] row = (Object[]) session.createNativeQuery(
						String.format("""
													SELECT SUM(trip_count),
														   SUM(total_passengers),
														   SUM(total_fare)
													FROM monthly_aggregate
													WHERE %s = %d
													  AND ym_as_date >= '%s'
													  AND ym_as_date <= '%s';
								""",
								isPickUp ? "pulocationid" : "dolocationid",
								locationID,
								dateFormat.format(startDate),
								dateFormat.format(endDate)))
				.list().get(0);
		TripAggregateInfo info = new TripAggregateInfo(
				(BigDecimal) row[0],
				(BigDecimal) row[1],
				(Double) row[2]);
		return info;
	}
}
