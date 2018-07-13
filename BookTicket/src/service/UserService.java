package service;

import entity.User;

/**
 * 
 * @param 给用户服务提供接口
 * @author zmx2321
 *
 */

public interface UserService {
	//用户注册
	public boolean regist(User user);

	//用户登录
	public boolean login(String username, String password);
	
	//修改账户余额
	public boolean updateAccount(int id, float user_balance);
}
