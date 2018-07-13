package entity;

/**
 * 
 * @param �û���
 * @author zmx2321
 *
 */

public class User {
	private int user_id = 0;  //�û�ID
	private String user_name = null;  //�û��˺�
	private String user_password = null;  //�û�����
	private String user_sex = null;  //�û��Ա�
	private String user_phone = null;  //�û��ֻ�
	private float user_balance = 0;  //�û����
	
	//�û���Ϣ1
	public User() {}
	
	//�û���Ϣ2
	public User(int user_id, String user_name, String user_sex, String user_phone, float user_balance) {
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_sex = user_sex;
		this.user_phone = user_phone;
		this.user_balance = user_balance;
	}
	
	//�û���Ϣ3
	public User(String user_name, String user_sex, String user_phone, float user_balance) {
		this.user_name = user_name;
		this.user_sex = user_sex;
		this.user_phone = user_phone;
		this.user_balance = user_balance;
	}
	
	//�û���Ϣ4
	public User(int user_id, float user_balance) {
		this.user_id = user_id;
		this.user_balance = user_balance;
	}
	
	//�û���Ϣ5
	public User(int user_id) {
		this.user_id = user_id;
	}
	
	//�û���Ϣ6
	public User(float user_balance) {
		this.user_balance = user_balance;
	}

	//�˺�����
	public User(String user_name, String user_password) {
		this.user_name = user_name;
		this.user_password = user_password;
	}
	
	/**
	 * @return the user_id
	 */
	public int getUser_id() {
		return user_id;
	}

	/**
	 * @param user_id the user_id to set
	 */
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	/**
	 * @return the user_name
	 */
	public String getUser_name() {
		return user_name;
	}

	/**
	 * @param user_name the user_name to set
	 */
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	/**
	 * @return the user_password
	 */
	public String getUser_password() {
		return user_password;
	}

	/**
	 * @param user_password the user_password to set
	 */
	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}

	/**
	 * @return the user_sex
	 */
	public String getUser_sex() {
		return user_sex;
	}

	/**
	 * @param user_sex the user_sex to set
	 */
	public void setUser_sex(String user_sex) {
		this.user_sex = user_sex;
	}

	/**
	 * @return the user_phone
	 */
	public String getUser_phone() {
		return user_phone;
	}

	/**
	 * @param user_phone the user_phone to set
	 */
	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	/**
	 * @return the user_balance
	 */
	public float getUser_balance() {
		return user_balance;
	}

	/**
	 * @param user_balance the user_balance to set
	 */
	public void setUser_balance(float user_balance) {
		this.user_balance = user_balance;
	}

	//���
	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", user_name=" + user_name + ", user_sex=" + user_sex + ", user_phone="
				+ user_phone + ", user_balance=" + user_balance + "]";
	}
	
	//test
	public static void main(String[] args) {
		User user = new User();
		String result = user.toString();
		System.out.println(result);
	}
}
