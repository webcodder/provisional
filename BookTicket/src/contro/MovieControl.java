package contro;

import java.util.List;

import dao.impl.MovieDaoImpl;
import entity.Movie;
import service.impl.MovieServiceImpl;

/**
 * 
 * @param ��Ӱ���Ʋ�
 * @author zmx2321
 * 
 */

public class MovieControl {
	static MovieServiceImpl movieService = new MovieServiceImpl();
	
	//��ѯ��Ӱ
	public static void queryMovies(){
		//ʵ�������ݿ�����ӿ�ʵ����
		MovieDaoImpl movieDao = new MovieDaoImpl();
		
		List<Movie> movieList = movieDao.querryMovies();
		
		for(Movie movie : movieList){
			System.out.println(movie);
		}
	}
	
	//test
	public static void main(String[] args) {
		queryMovies();
	}
}
