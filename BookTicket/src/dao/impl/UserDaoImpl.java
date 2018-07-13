package dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dao.UserDao;
import dbhelp.DbHelp;
import entity.User;

/**
 * 
 * @param ʵ���û������ݽӿ�
 * @author zmx2321
 * 
 */

public class UserDaoImpl implements UserDao {
	private DbHelp db;
	private Connection conn;
	private List<User> list;
	
	//���췽����ʼ��
	public UserDaoImpl() {
		db = new DbHelp();
		list = new ArrayList<>();
	}

	//ʵ������û�
	@Override
	public int addUser(User user) {
		conn = db.getConnection();
		String sql = "insert into user(`user_name`, `user_password`, `user_sex`, `user_phone`, `user_balance`) values(?,?,?,?,?)";
		
		PreparedStatement ps  = null;
		try {
			ps = conn.prepareStatement(sql);
			
			ps.setString(1, user.getUser_name());
			ps.setString(2, user.getUser_password());
			ps.setString(3, user.getUser_sex());
		
			ps.setString(4, user.getUser_phone());
			ps.setFloat(5, user.getUser_balance());
			
			return ps.executeUpdate();//ִ�в��������ݿ�����
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			db.closeAll(conn, ps, null);
		}
		
		return 0;
	}

	//ʵ��ɾ���û�
	@Override
	public int deleteUser(int id) {
		conn = db.getConnection();
		String sql = "delete from user where user_id = ?";
		PreparedStatement ps  = null;
		
		try {
			ps=conn.prepareStatement(sql);
			ps.setInt(1, id);
			
			return ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			db.closeAll(conn, ps, null);
		}
		
		return 0;
	}

	//ʵ���޸��û�
	@Override
	public int updateUser(User user) {
		conn = db.getConnection();
		String sql = "update user set user_name=?, user_sex=?, user_phone=?, user_balance=? where user_id=?";
		PreparedStatement ps  = null;
		
		try {
			ps=conn.prepareStatement(sql);
			
			ps.setString(1, user.getUser_name());
			ps.setObject(2, user.getUser_sex());
			ps.setString(3, user.getUser_phone());
			ps.setFloat(4, user.getUser_balance());
			ps.setInt(5, user.getUser_id());
			
			return ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			db.closeAll(conn, ps, null);
		}
		
		return 0;
	}

	//�����û�id�޸��˻����
	@Override
	public int updateUser(int id, float user_balance){
		//��¼���
		UserDaoImpl userDao = new UserDaoImpl();
		float user_balance1 = userDao.queryUserAccount(id);
		
		conn = db.getConnection();
		String sql = "update user set user_balance=? where user_id=?";
		PreparedStatement ps  = null;
		
		User user = new User(id, user_balance);
		
		try {
			ps=conn.prepareStatement(sql);
			
			ps.setFloat(1, user.getUser_balance() + user_balance1);  //�������
			ps.setInt(2, user.getUser_id());
			
			return ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}
	
	/*//ʵ���޸��û�
	@Override
	public int updateUser(int id, float user_balance){
		conn = db.getConnection();
		String sql = "update user set user_name=?, user_sex=?, user_phone=?, user_balance=? where user_id=?";
		PreparedStatement ps  = null;
		
		try {
			ps=conn.prepareStatement(sql);
			
			return ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}*/
	
	//ʵ�ֲ�ѯ�û�
	@Override
	public List<User> querryUser() {
		conn = db.getConnection();
		String sql = "select * from user";
		PreparedStatement ps  = null;
		ResultSet rs  = null;
		
		try {
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			
			User user;
			//һ��һ���ؼ�¼��Ϣ
			while(rs.next()){
				int user_id = rs.getInt("user_id");
				String user_name = rs.getString("user_name");
				String user_sex = rs.getString("user_sex");
				String user_phone = rs.getString("user_phone");
				float user_balance = rs.getFloat("user_balance");
				
				user = new User(user_id, user_name, user_sex, user_phone, user_balance);
						
				list.add(user);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			db.closeAll(conn, ps, rs);
		}
		
		return list;
	}

	//��ѯ�û��˺������Ӧ��id,������user
	@Override
	public User queryUser(String username, String password) {
		User user = null;
		
		conn = db.getConnection();
		String sql = "select user_id from user where user_name=? and user_password=?";
		
		PreparedStatement ps  = null;
		try {
			ps = conn.prepareStatement(sql);
			
			ps.setString(1, username);
			ps.setString(2, password);

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				user = new User();
				user.setUser_id(rs.getInt("user_id"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return user;
	}
	
	//����id��ѯ�û�
	@Override
	public User queryUser(int id){
		conn = db.getConnection();
		String sql = "select * from user where user_id=?";
		User user = new User(id);
		
		PreparedStatement ps  = null;
		ResultSet rs  = null;
		
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, user.getUser_id());
			
			rs = ps.executeQuery();
			
			//һ��һ���ؼ�¼��Ϣ
			while(rs.next()){
				int user_id = rs.getInt("user_id");
				String user_name = rs.getString("user_name");
				String user_sex = rs.getString("user_sex");
				String user_phone = rs.getString("user_phone");
				float user_balance = rs.getFloat("user_balance");
				
				user = new User(user_id, user_name, user_sex, user_phone, user_balance);
				
				return user;
			}	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}
	
	//����id��ѯ�û����
	@Override
	public float queryUserAccount(int id){
		conn = db.getConnection();
		String sql = "select user_balance from user where user_id=?";
		User user = new User(id);
		
		PreparedStatement ps  = null;
		ResultSet rs  = null;
		
		try {
			ps = conn.prepareStatement(sql);
			ps.setInt(1, user.getUser_id());
			
			rs = ps.executeQuery();
			
			//һ��һ���ؼ�¼��Ϣ
			while(rs.next()){
				float user_balance = rs.getFloat("user_balance");
				user = new User(user_balance);
				
				return user_balance;
			}	
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}
	
	//������ɾ�Ĳ�
	public static void main(String[] args) {
		//���ؽ��
		/*int addResult1 = 0,  //���1
			addResult2 = 0,  //���2
			delResult = 0,  //ɾ��
			updateResult1 = 0,  //�޸�1
			updateResult2 = 0;  //�޸�2
		
		//ʵ�������ݿ�����ӿ�ʵ����
		UserDaoImpl userDao = new UserDaoImpl();
		
		//ʵ�����û���
		User user1 = new User("С��", "��", "123132132", 250);
		User user2 = new User("У��", "Ů", "3325568", 180);
		User user3 = new User(4, "xiaoi", "Ů", "233333333", 500);*/
		
		//��
		/*System.out.println("***** ���� *****");
		addResult1 = userDao.addUser(user1);
		addResult2 = userDao.addUser(user2);
		
		if(addResult1 == 1){
			System.out.println("����1����ɹ���");
		}else{
			System.out.println("����1����ʧ�ܣ�");
		}
		
		if(addResult2 == 1){
			System.out.println("����2����ɹ���");
		}else{
			System.out.println("����2����ʧ�ܣ�");
		}
		System.out.println();*/
		
		//ɾ
		/*System.out.println("***** ɾ�� *****");
		delResult =  userDao.deleteUser(2);
		if(delResult == 1){
			System.out.println("idΪ2������ɾ���ɹ���");
		}else{
			System.out.println("idΪ2������ɾ��ʧ�ܣ�");
		}
		System.out.println();*/
		
		//��
		/*System.out.println("***** �޸� *****");
		updateResult1 = userDao.updateUser(user3);
		if(updateResult1 == 1){
			System.out.println("idΪ1�������޸ĳɹ���");
		}else{
			System.out.println("idΪ1�������޸�ʧ�ܣ�");
		}
		System.out.println();*/
		
		//�����û�id�޸��˻����
		/*updateResult2 = userDao.updateUser(3, 200);
		if(updateResult2 == 1){
			System.out.println("idΪ3������޸ĳɹ���");
		}else{
			System.out.println("idΪ3������޸�ʧ�ܣ�");
		}
		System.out.println();*/
		
		//��
		/*System.out.println("***** ��ѯ *****");
		List<User> userList = userDao.querryUser();
		for(User user : userList){
			System.out.println(user);
		}
		System.out.println();*/
		
		//��ѯ�û��˺������Ӧ��id
		/*System.out.println("***** ��ѯ�û��˺����� *****");
		System.out.println(userDao.queryUser("����", "789789"));
		System.out.println();*/
		
		//����id��ѯ�û�
		/*User user = userDao.queryUser(3);
		System.out.println(user);
		System.out.println();*/
		
		//����id��ѯ�û����
		/*float user_balance = userDao.queryUserAccount(11);
		System.out.println(user_balance);*/
	}
}
