package service.impl;

import java.util.List;

import dao.MovieDao;
import entity.Movie;
import service.MovieService;

/**
 * 
 * @param ʵ�ֵ�Ӱ����ӿ�
 * @author zmx2321
 * 
 */

public class MovieServiceImpl implements MovieService {
	
	private MovieDao movieDao;

	//��ѯ��Ӱ
	@Override
	public boolean queryMovies() {
		List<Movie> movieList = null;
		movieList =	movieDao.querryMovies();
		return movieList == null ? false : true;
	}

}
