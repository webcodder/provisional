package contro;

import dao.impl.UserDaoImpl;
import entity.User;
import service.UserService;
import service.impl.UserServiceImpl;
import util.CodeGen;
import util.Help;

/**
 * 
 * @param �û����Ʋ�
 * @author zmx2321
 * 
 */


public class UserContro {
	static UserService userService = new UserServiceImpl();
	
	//��¼
	public static User login(){
		String username = Help.getString("�������˺ţ�");
		String password = Help.getString("���������룺");
		User user = new User(username, password);

		boolean success = userService.login(username, password);
		
		if(success){
			System.out.println("\n" + username + "��½�ɹ�!\n");
			return user;
		}else{
			System.out.println("�û����������������������");
		}
		
		return null;
	}
	
	//ע��
	public static User regist(){
		String username = Help.getString("�������˺ţ�");
		String password = Help.getString("���������룺");
		String repassword = Help.getString("��ȷ�����룺");
		
		int times = 3;  //������
		
		while (!password.equals(repassword)){
			repassword = Help.getString("�������벻һ�£�����������ȷ�����룺");
			times--;
			
			if(times < 0){
				System.out.println("ȷ���������볬�����ޣ����˳�ע�ᣡ\n");
				return null;
			}
		}

		String sex = Help.getString("�������Ա�");
		String phone = Help.getString("�������ֻ����룺");
		
		CodeGen.operaCodeGen();  //��֤��

		User user = new User();
		user.setUser_name(username);
		user.setUser_password(repassword);
		user.setUser_sex(sex);
		user.setUser_phone(phone);

		boolean success = userService.regist(user);
		
		if (success) {
			System.out.println("ע��ɹ���\n");
			return user;
		} else {
			System.out.println("ע��ʧ�ܣ�\n");
			return null;
		}
	}
	
	//�޸��˻�����ֵ��
	public static void updateAccount(){
		UserDaoImpl userDao = new UserDaoImpl();
		int user_id = Help.getInt("�������˻���ţ�");
		float user_balance = Help.getFloat("��������Ҫ��ֵ�Ľ�");
		
		boolean success = userService.updateAccount(user_id, user_balance);
		
		//��¼���
		float user_balance1 = userDao.queryUserAccount(user_id);
		
		if(success){
			System.out.println("��ֵ�ɹ��������ڵ����Ϊ��" + user_balance1 + "\n");
		}else{
			System.out.println("��ֵʧ�ܣ�");
		}
	}
	
	//test
	public static void main(String[] args) {
		//��¼
		/*User resultLogin = login();
		System.out.println(resultLogin);*/
		
		//ע��
		/*User resultRegist = regist();
		System.out.println(resultRegist);*/
		
		//�޸��˻�����ֵ��
		/*User ResultUpdateAccount = updateAccount();
		System.out.println(ResultUpdateAccount);*/
	}
}
