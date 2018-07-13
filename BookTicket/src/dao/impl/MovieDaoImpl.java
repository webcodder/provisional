package dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dao.MovieDao;
import dbhelp.DbHelp;
import entity.Movie;

/**
 * 
 * @param ʵ�ֵ�Ӱ�����ݽӿ�
 * @author zmx2321
 * 
 */

public class MovieDaoImpl implements MovieDao {
	private DbHelp db;
	private Connection conn;
	private List<Movie> list;
	
	//���췽����ʼ��
	public MovieDaoImpl() {
		db = new DbHelp();
		list = new ArrayList<>();
	}

	@Override
	public List<Movie> querryMovies() {
		conn = db.getConnection();
		String sql = "select * from movie";
		PreparedStatement ps  = null;
		ResultSet rs  = null;
		
		try {
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			
			Movie movie;
			//һ��һ���ؼ�¼��Ϣ
			while(rs.next()){
				int movie_id = rs.getInt("movie_id");
				String movie_name = rs.getString("movie_name");
				String movie_performer = rs.getString("movie_performer");
				String movie_length = rs.getString("movie_length");
				String movie_type = rs.getString("movie_type");
				String movie_time = rs.getString("movie_time");
				int movie_score = rs.getInt("movie_score");
				String movie_info = rs.getString("movie_info");
				
				movie = new Movie(movie_id, movie_name, movie_performer, movie_length, movie_type, movie_time, movie_score, movie_info);
			
				list.add(movie);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			db.closeAll(conn, ps, rs);
		}
		
		return list;
	}
	
	//test
	public static void main(String[] args) {
		//ʵ�������ݿ�����ӿ�ʵ����
		MovieDaoImpl movieDao = new MovieDaoImpl();
		
		//��
		System.out.println("***** ��ѯ *****");
		List<Movie> movieList = movieDao.querryMovies();
		for(Movie movie : movieList){
			System.out.println(movie);
		}
	}
}
