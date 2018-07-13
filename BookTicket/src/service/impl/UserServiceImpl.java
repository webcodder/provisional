package service.impl;

import dao.UserDao;
import entity.User;
import service.UserService;
import dao.impl.UserDaoImpl;

/**
 * 
 * @param 实现用户服务接口
 * @author zmx2321
 * 
 */

public class UserServiceImpl implements UserService {
	private User user = null;  //初始化user
	private int code = 0;  //sql执行状态
	
	private UserDao userDao;
	
	public UserServiceImpl() {
		userDao = new UserDaoImpl();
	}

	//注册
	@Override
	public boolean regist(User user) {
		int code = 0;
		code = userDao.addUser(user);
		
		return code == 0 ? false : true;
	}

	//登录
	@Override
	public boolean login(String username, String password) {
		user = userDao.queryUser(username, password);
		
		return user == null ? false : true;
	}

	//修改账户余额
	@Override
	public boolean updateAccount(int id, float user_balance) {
		code = userDao.updateUser(id, user_balance);
		
		return code == 0 ? false : true;
	}
	
	//test
	public static void main(String[] args) {
		//UserServiceImpl usi = new UserServiceImpl();
		
		//User user = new User("小i", "男", "78569", 1111);
		
		//注册
		//System.out.println(usi.regist(user));
		
		//登录
		//System.out.println(usi.login("张三", "123123"));
		
		//修改账户余额
		//System.out.println(usi.updateAccount(5, 302));
	}
}
