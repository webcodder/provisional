package dao;

import java.util.List;

import entity.Movie;

/**
 * 
 * @param 给电影类提供数据接口
 * @author zmx2321
 *
 */

public interface MovieDao {
	//查询所有电影信息
	public List<Movie> querryMovies();
}
