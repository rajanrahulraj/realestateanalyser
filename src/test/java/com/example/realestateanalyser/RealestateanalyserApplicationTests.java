package com.example.realestateanalyser;

import com.example.realestateanalyser.pojo.TripAggregateInfo;
import com.example.realestateanalyser.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

@SpringBootTest
class RealestateanalyserApplicationTests {

	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

	@Test
	void plainSQLTest() {
		Session session = sessionFactory.openSession();
		final Object[] row = (Object[]) session.createNativeQuery("""
											SELECT SUM(trip_count),
												   SUM(total_passengers),
												   SUM(total_fare)
											FROM monthly_trips
											WHERE pulocationid = 132
											  AND ym_as_date >= '2020-01-01'
											  AND ym_as_date <= '2021-03-01';
						""")
				.list().get(0);
		TripAggregateInfo info = new TripAggregateInfo(
				(BigDecimal) row[0],
				(BigDecimal) row[1],
				(Double) row[2]);
		System.out.println(info);
	}
}
