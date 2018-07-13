package service.impl;

import dao.UserDao;
import entity.User;
import service.UserService;
import dao.impl.UserDaoImpl;

/**
 * 
 * @param ʵ���û�����ӿ�
 * @author zmx2321
 * 
 */

public class UserServiceImpl implements UserService {
	private User user = null;  //��ʼ��user
	private int code = 0;  //sqlִ��״̬
	
	private UserDao userDao;
	
	public UserServiceImpl() {
		userDao = new UserDaoImpl();
	}

	//ע��
	@Override
	public boolean regist(User user) {
		int code = 0;
		code = userDao.addUser(user);
		
		return code == 0 ? false : true;
	}

	//��¼
	@Override
	public boolean login(String username, String password) {
		user = userDao.queryUser(username, password);
		
		return user == null ? false : true;
	}

	//�޸��˻����
	@Override
	public boolean updateAccount(int id, float user_balance) {
		code = userDao.updateUser(id, user_balance);
		
		return code == 0 ? false : true;
	}
	
	//test
	public static void main(String[] args) {
		//UserServiceImpl usi = new UserServiceImpl();
		
		//User user = new User("Сi", "��", "78569", 1111);
		
		//ע��
		//System.out.println(usi.regist(user));
		
		//��¼
		//System.out.println(usi.login("����", "123123"));
		
		//�޸��˻����
		//System.out.println(usi.updateAccount(5, 302));
	}
}
