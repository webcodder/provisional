package service.impl;

import java.util.List;

import dao.MovieDao;
import entity.Movie;
import service.MovieService;

/**
 * 
 * @param 实现电影服务接口
 * @author zmx2321
 * 
 */

public class MovieServiceImpl implements MovieService {
	
	private MovieDao movieDao;

	//查询电影
	@Override
	public boolean queryMovies() {
		List<Movie> movieList = null;
		movieList =	movieDao.querryMovies();
		return movieList == null ? false : true;
	}

}
