package run;

import java.util.Scanner;

import service.UserService;
import service.impl.UserServiceImpl;

public class test {
	static UserService userService = new UserServiceImpl();
	
	@SuppressWarnings("resource")
	public static boolean login() {
		Scanner scan = new Scanner(System.in);
		// -------------------��¼-----------------------
		System.out.println("�������˺ţ�");
		String username = scan.next();
		System.out.println("���������룺");
		String password = scan.next();

		boolean success = userService.login(username, password);
		return success;

	}
	
	public static void main(String[] args) {
		boolean result = login();
		System.out.println(result);
	}
}
