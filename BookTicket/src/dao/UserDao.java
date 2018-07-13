package dao;

import java.util.List;

import entity.User;

/**
 * 
 * @param 给用户类提供数据接口
 * @author zmx2321
 *
 */

public interface UserDao {	
	//根据id查询用户
	public User queryUser(int id);
	
	//根据id查询用户余额
	public float queryUserAccount(int id);
	
	//添加用户信息
	public int addUser(User user);
	
	//根据id删除用户
	public int deleteUser(int id);
	
	//修改用户信息
	public int updateUser(User user);
	
	//根据用户id修改账户余额
	public int updateUser(int id, float user_balance);
	
	//查询所有用户信息
	public List<User> querryUser();
	
	//查询用户账号密码对应的id,并返回user
	public User queryUser(String username, String password);
}
