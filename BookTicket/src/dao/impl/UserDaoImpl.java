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
 * @param 实现用户类数据接口
 * @author zmx2321
 * 
 */

public class UserDaoImpl implements UserDao {
	private DbHelp db;
	private Connection conn;
	private List<User> list;
	
	//构造方法初始化
	public UserDaoImpl() {
		db = new DbHelp();
		list = new ArrayList<>();
	}

	//实现添加用户
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
			
			return ps.executeUpdate();//执行并更新数据库内容
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			db.closeAll(conn, ps, null);
		}
		
		return 0;
	}

	//实现删除用户
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

	//实现修改用户
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

	//根据用户id修改账户余额
	@Override
	public int updateUser(int id, float user_balance){
		//记录余额
		UserDaoImpl userDao = new UserDaoImpl();
		float user_balance1 = userDao.queryUserAccount(id);
		
		conn = db.getConnection();
		String sql = "update user set user_balance=? where user_id=?";
		PreparedStatement ps  = null;
		
		User user = new User(id, user_balance);
		
		try {
			ps=conn.prepareStatement(sql);
			
			ps.setFloat(1, user.getUser_balance() + user_balance1);  //余额增加
			ps.setInt(2, user.getUser_id());
			
			return ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}
	
	/*//实现修改用户
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
	
	//实现查询用户
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
			//一条一条地记录信息
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

	//查询用户账号密码对应的id,并返回user
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
	
	//根据id查询用户
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
			
			//一条一条地记录信息
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
	
	//根据id查询用户余额
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
			
			//一条一条地记录信息
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
	
	//测试增删改查
	public static void main(String[] args) {
		//返回结果
		/*int addResult1 = 0,  //添加1
			addResult2 = 0,  //添加2
			delResult = 0,  //删除
			updateResult1 = 0,  //修改1
			updateResult2 = 0;  //修改2
		
		//实例化数据库操作接口实现类
		UserDaoImpl userDao = new UserDaoImpl();
		
		//实例化用户类
		User user1 = new User("小明", "男", "123132132", 250);
		User user2 = new User("校长", "女", "3325568", 180);
		User user3 = new User(4, "xiaoi", "女", "233333333", 500);*/
		
		//增
		/*System.out.println("***** 新增 *****");
		addResult1 = userDao.addUser(user1);
		addResult2 = userDao.addUser(user2);
		
		if(addResult1 == 1){
			System.out.println("数据1插入成功！");
		}else{
			System.out.println("数据1插入失败！");
		}
		
		if(addResult2 == 1){
			System.out.println("数据2插入成功！");
		}else{
			System.out.println("数据2插入失败！");
		}
		System.out.println();*/
		
		//删
		/*System.out.println("***** 删除 *****");
		delResult =  userDao.deleteUser(2);
		if(delResult == 1){
			System.out.println("id为2的数据删除成功！");
		}else{
			System.out.println("id为2的数据删除失败！");
		}
		System.out.println();*/
		
		//改
		/*System.out.println("***** 修改 *****");
		updateResult1 = userDao.updateUser(user3);
		if(updateResult1 == 1){
			System.out.println("id为1的数据修改成功！");
		}else{
			System.out.println("id为1的数据修改失败！");
		}
		System.out.println();*/
		
		//根据用户id修改账户余额
		/*updateResult2 = userDao.updateUser(3, 200);
		if(updateResult2 == 1){
			System.out.println("id为3的余额修改成功！");
		}else{
			System.out.println("id为3的余额修改失败！");
		}
		System.out.println();*/
		
		//查
		/*System.out.println("***** 查询 *****");
		List<User> userList = userDao.querryUser();
		for(User user : userList){
			System.out.println(user);
		}
		System.out.println();*/
		
		//查询用户账号密码对应的id
		/*System.out.println("***** 查询用户账号密码 *****");
		System.out.println(userDao.queryUser("王五", "789789"));
		System.out.println();*/
		
		//根据id查询用户
		/*User user = userDao.queryUser(3);
		System.out.println(user);
		System.out.println();*/
		
		//根据id查询用户余额
		/*float user_balance = userDao.queryUserAccount(11);
		System.out.println(user_balance);*/
	}
}
