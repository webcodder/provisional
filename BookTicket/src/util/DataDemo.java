package util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class DataDemo {
	public static void main(String[] args) {
		Date date = new Date();  //����ϵͳĬ��ʱ��
		System.out.println(date);  //Thu Dec 14 17:17:51 CST 2017
		System.out.println(date.getTime());  //������ 1970 �� 1 �� 1 �� 00:00:00 GMT ������ Date �����ʾ�ĺ�������
		
		//����ʱ��
		date.setTime(1513243234809L);
		System.out.println(date);
		
		//���ڸ�ʽ����(������)DateFormat(public abstract class DateFormatextends Format)
		DateFormat df1 = null;
		DateFormat df2 = null;
		DateFormat df3 = null;
		DateFormat df4 = null;
		DateFormat df5 = null;
		
		//�����������(��̬����ֱ������.����)
		//�����һ���������
		//�����಻��ʵ������������ͨ������ʵ���������������
		df1 = DateFormat.getDateInstance();
		df2 = DateFormat.getDateTimeInstance();
		df3 = DateFormat.getDateInstance(DateFormat.FULL, new Locale("zh", "CN"));  //���ڸ�ʽ������
		df4 = DateFormat.getDateInstance(DateFormat.FULL, new Locale("en", "US"));
		df5 = DateFormat.getDateTimeInstance(DateFormat.FULL, DateFormat.FULL, new Locale("zh", "CN"));  //���ڸ�ʽ��ʱ���ʽ������
		
		System.out.println("���ڣ�" + df1.format(date));
		System.out.println("ʱ�䣺" + df2.format(date));
		System.out.println("�й���" + df3.format(date));
		System.out.println("������" + df4.format(date));
		System.out.println("ʱ�䣺" + df5.format(date));
		
		//�Զ����ʽ���--SimpleDateFormat(DateFormat������)
		String strDate = "2010-10-19 10:11:30.345";
		//����һ�����ڶ���
		Date d = null;
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");  //���ڸ�ʽ������
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy��MM��dd�� HH-mm-ss.SSS");
		
		try {
			d = sdf1.parse(strDate);  //�������ַ����е����ڲ��ֳ�ȡ����������һ��Date����
		} catch (ParseException e) {
			//e.printStackTrace();  //��ӡ��ջ
			e.getMessage();
		}
		System.out.println(d);
		
		String str = sdf2.format(d);  //�����ڰ�ָ����ģ���ʽ���Ϊ�ַ���
		System.out.println(str);
	}
}
