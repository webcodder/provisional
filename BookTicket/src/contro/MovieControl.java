package contro;

import java.util.List;

import dao.impl.MovieDaoImpl;
import entity.Movie;
import service.impl.MovieServiceImpl;

/**
 * 
 * @param 电影控制层
 * @author zmx2321
 * 
 */

public class MovieControl {
	static MovieServiceImpl movieService = new MovieServiceImpl();
	
	//查询电影
	public static void queryMovies(){
		//实例化数据库操作接口实现类
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
