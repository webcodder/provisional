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
	
	//静态代码块，类加载的时候就被执行一次
	static{
		//用来存放从配置文件中读取的信息
		Properties props = new Properties();
		//读取配置文件，转成流
		InputStream ism = 
				DbHelp.class.getResourceAsStream("jdbcinfo.properties");
		
		try {
			//读取流中的信息
			props.load(ism);
			
			//获取流中的信息存储到静态变量中
			DRIVER = props.getProperty("mysql.driver");
			URL = props.getProperty("mysql.url");
			USER = props.getProperty("mysql.user");
			PASSWORD = props.getProperty("mysql.password");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//注册驱动并建立连接
	public Connection getConnection(){
		Connection conn = null;
		
		try {
			//加载驱动(驱动实例化)
			Class.forName(DRIVER);
			
			//获得数据库连接
			conn = DriverManager.getConnection(URL, USER, PASSWORD);
			
			return conn;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	//关闭数据库
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
	
	//测试数据库是否连接成功
	public static void main(String[] args) {
		DbHelp db = new DbHelp();
		
		System.out.println(db.getConnection());
	}
}