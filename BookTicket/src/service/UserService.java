package service;

import entity.User;

/**
 * 
 * @param ���û������ṩ�ӿ�
 * @author zmx2321
 *
 */

public interface UserService {
	//�û�ע��
	public boolean regist(User user);

	//�û���¼
	public boolean login(String username, String password);
	
	//�޸��˻����
	public boolean updateAccount(int id, float user_balance);
}
