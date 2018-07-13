package entity;

/**
 * 
 * @param 影厅类
 * @author zmx2321
 *
 */

public class Hall {
	private int hall_id = 0;  //影厅id
	private String hall_name = null;  //影厅名
	private int cinema_id = 0;  //影院id
	
	//影厅信息1
	public Hall() {}

	//影厅信息2
	public Hall(int hall_id, String hall_name, int cinema_id) {
		super();
		this.hall_id = hall_id;
		this.hall_name = hall_name;
		this.cinema_id = cinema_id;
	}

	//影厅信息3
	public Hall(String hall_name, int cinema_id) {
		super();
		this.hall_name = hall_name;
		this.cinema_id = cinema_id;
	}

	/**
	 * @return the hall_id
	 */
	public int getHall_id() {
		return hall_id;
	}

	/**
	 * @param hall_id the hall_id to set
	 */
	public void setHall_id(int hall_id) {
		this.hall_id = hall_id;
	}

	/**
	 * @return the hall_name
	 */
	public String getHall_name() {
		return hall_name;
	}

	/**
	 * @param hall_name the hall_name to set
	 */
	public void setHall_name(String hall_name) {
		this.hall_name = hall_name;
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

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Hall [hall_id=" + hall_id + ", hall_name=" + hall_name + ", cinema_id=" + cinema_id + "]";
	}
	
	//test
	public static void main(String[] args) {
		Hall hall = new Hall();
		String result = hall.toString();
		System.out.println(result);
	}
}
