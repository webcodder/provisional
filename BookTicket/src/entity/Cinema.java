package entity;

/**
 * 
 * @param ӰԺ��
 * @author zmx2321
 *
 */

public class Cinema {
	private int cinema_id = 0;  //ӰԺid
	private String cinema_name = null;  //ӰԺ��
	private String cinema_address = null;  //ӰԺ��ַ
	private String cinema_city = null;  //ӰԺ����
	
	//ӰԺ��Ϣ1
	public Cinema() {}

	//ӰԺ��Ϣ2
	public Cinema(int cinema_id, String cinema_name, String cinema_address, String cinema_city) {
		super();
		this.cinema_id = cinema_id;
		this.cinema_name = cinema_name;
		this.cinema_address = cinema_address;
		this.cinema_city = cinema_city;
	}

	//ӰԺ��Ϣ3
	public Cinema(String cinema_name, String cinema_address, String cinema_city) {
		super();
		this.cinema_name = cinema_name;
		this.cinema_address = cinema_address;
		this.cinema_city = cinema_city;
	}

	/**
	 * @return the cinema_id
	 */
	public int getCinema_id() {
		return cinema_id;
	}

	/**
	 * @param cinema_id the cinema_id to set
	 */
	public void setCinema_id(int cinema_id) {
		this.cinema_id = cinema_id;
	}

	/**
	 * @return the cinema_name
	 */
	public String getCinema_name() {
		return cinema_name;
	}

	/**
	 * @param cinema_name the cinema_name to set
	 */
	public void setCinema_name(String cinema_name) {
		this.cinema_name = cinema_name;
	}

	/**
	 * @return the cinema_address
	 */
	public String getCinema_address() {
		return cinema_address;
	}

	/**
	 * @param cinema_address the cinema_address to set
	 */
	public void setCinema_address(String cinema_address) {
		this.cinema_address = cinema_address;
	}

	/**
	 * @return the cinema_city
	 */
	public String getCinema_city() {
		return cinema_city;
	}

	/**
	 * @param cinema_city the cinema_city to set
	 */
	public void setCinema_city(String cinema_city) {
		this.cinema_city = cinema_city;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Cinema [cinema_id=" + cinema_id + ", cinema_name=" + cinema_name + ", cinema_address=" + cinema_address
				+ ", cinema_city=" + cinema_city + "]";
	}
	
	//test
	public static void main(String[] args) {
		Cinema cinema = new Cinema();
		String result = cinema.toString();
		System.out.println(result);
	}
}
