package dao;

import java.util.List;

import entity.Movie;

/**
 * 
 * @param ����Ӱ���ṩ���ݽӿ�
 * @author zmx2321
 *
 */

public interface MovieDao {
	//��ѯ���е�Ӱ��Ϣ
	public List<Movie> querryMovies();
}
