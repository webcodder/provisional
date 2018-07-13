package dbhelp;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DbHelp {
	private static  String DRIVER;
	private static  String URL;
	private static  String USER;
	private static  String PASSWORD;
	
	//��̬����飬����ص�ʱ��ͱ�ִ��һ��
	static{
		//������Ŵ������ļ��ж�ȡ����Ϣ
		Properties props = new Properties();
		//��ȡ�����ļ���ת����
		InputStream ism = 
				DbHelp.class.getResourceAsStream("jdbcinfo.properties");
		
		try {
			//��ȡ���е���Ϣ
			props.load(ism);
			
			//��ȡ���е���Ϣ�洢����̬������
			DRIVER = props.getProperty("mysql.driver");
			URL = props.getProperty("mysql.url");
			USER = props.getProperty("mysql.user");
			PASSWORD = props.getProperty("mysql.password");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//ע����������������
	public Connection getConnection(){
		Connection conn = null;
		
		try {
			//��������(����ʵ����)
			Class.forName(DRIVER);
			
			//������ݿ�����
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			
			return conn;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	//�ر����ݿ�
	public void closeAll(Connection conn, PreparedStatement ps, ResultSet rs) {
		if (rs!= null) {
			try {
				rs.close();
				rs = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		if (ps!= null) {
			try {
				ps.close();
				ps = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		if (conn!= null) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	//�������ݿ��Ƿ����ӳɹ�
	public static void main(String[] args) {
		DbHelp db = new DbHelp();
		
		System.out.println(db.getConnection());
	}
}