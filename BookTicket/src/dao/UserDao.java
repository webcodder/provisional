package dao;

import java.util.List;

import entity.User;

/**
 * 
 * @param ���û����ṩ���ݽӿ�
 * @author zmx2321
 *
 */

public interface UserDao {	
	//����id��ѯ�û�
	public User queryUser(int id);
	
	//����id��ѯ�û����
	public float queryUserAccount(int id);
	
	//����û���Ϣ
	public int addUser(User user);
	
	//����idɾ���û�
	public int deleteUser(int id);
	
	//�޸��û���Ϣ
	public int updateUser(User user);
	
	//�����û�id�޸��˻����
	public int updateUser(int id, float user_balance);
	
	//��ѯ�����û���Ϣ
	public List<User> querryUser();
	
	//��ѯ�û��˺������Ӧ��id,������user
	public User queryUser(String username, String password);
}
