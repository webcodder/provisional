package util;

import java.util.Scanner;

/**
 * @param �����࣬�û�����
 * @author zmx2321
 *
 */
public class Help {
	//��ȡ����
	private static Scanner in = new Scanner(System.in);

	/**
	 * @param �ӿ���̨����һ������ ���ظ����÷� �����������ʹ�����κ�һ������
	 *            
	 * @return �û���ʾ��Ϣ���û��������Ϣ ,�ַ�������
	 */
	public static String getString(String str) {
		System.out.print(str);
		return in.next();
	}

	/**
	 * 
	 * @param �ӿ���̨����һ������ ���ظ����÷� �����������ʹ�����κ�һ������
	 *            
	 * @return �û���ʾ��Ϣ���û��������Ϣ ����
	 */
	public static int getInt(String str) {
		System.out.print(str);
		while (true) {
			try {
				int num = in.nextInt();// ���ܻ�����쳣����
				return num;
			} catch (Exception e) {
				System.out.print("����������������������\n������һ��������");
				in.nextLine();
			}
		}
	}
	
	/**
	 * 
	 * @param �ӿ���̨����һ������ ���ظ����÷� �����������ʹ�����κ�һ������
	 *            
	 * @return �û���ʾ��Ϣ���û��������Ϣ ������
	 */
	public static float getFloat(String str) {
		System.out.print(str);
		while (true) {
			try {
				float num = in.nextFloat();// ���ܻ�����쳣����
				return num;
			} catch (Exception e) {
				System.out.print("����������������������\n������һ��С����");
				in.nextFloat();
			}
		}
	}
	
	//test
	public static void main(String[] args) {
		Help.getInt("�������֣�");
		
		Help.getString("�����ַ�����");
	}
}
