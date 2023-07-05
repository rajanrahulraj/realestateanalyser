package com.example.realestateanalyser.util;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;


public class HibernateUtil {
	public static SessionFactory sessionFactory;

	static {
		try {
			// using default hibernate configuration
			Configuration configuration = new Configuration()
					.configure("hibernate.cfg.xml");
					// .configure("application.yml");
			ServiceRegistry serviceRegistry =
					new StandardServiceRegistryBuilder().applySettings(configuration.getProperties()).build();
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);
		} catch (Throwable ex) {
			System.err.println("Hibernate session factory creation failed");
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
