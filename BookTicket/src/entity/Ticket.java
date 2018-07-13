package entity;

/**
 * 
 * @param 影票类
 * @author zmx2321
 *
 */

public class Ticket {
	private int ticket_id = 0;  //影票id
	private int season_id = 0;  //场次id
	private int ticket_seat_id = 0;  //选座位id
	private int user_id = 0;  //用户id
	private String ticket_status = null;  //影票状态
	
	//影票信息1
	public Ticket() {}

	//影票信息2
	public Ticket(int ticket_id, int season_id, int ticket_seat_id, int user_id, String ticket_status) {
		super();
		this.ticket_id = ticket_id;
		this.season_id = season_id;
		this.ticket_seat_id = ticket_seat_id;
		this.user_id = user_id;
		this.ticket_status = ticket_status;
	}

	//影票信息3
	public Ticket(int season_id, int ticket_seat_id, int user_id, String ticket_status) {
		super();
		this.season_id = season_id;
		this.ticket_seat_id = ticket_seat_id;
		this.user_id = user_id;
		this.ticket_status = ticket_status;
	}

	/**
	 * @return the ticket_id
	 */
	public int getTicket_id() {
		return ticket_id;
	}

	/**
	 * @param ticket_id the ticket_id to set
	 */
	public void setTicket_id(int ticket_id) {
		this.ticket_id = ticket_id;
	}

	/**
	 * @return the season_id
	 */
	public int getSeason_id() {
		return season_id;
	}

	/**
	 * @param season_id the season_id to set
	 */
	public void setSeason_id(int season_id) {
		this.season_id = season_id;
	}

	/**
	 * @return the ticket_seat_id
	 */
	public int getTicket_seat_id() {
		return ticket_seat_id;
	}

	/**
	 * @param ticket_seat_id the ticket_seat_id to set
	 */
	public void setTicket_seat_id(int ticket_seat_id) {
		this.ticket_seat_id = ticket_seat_id;
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
	 * @return the ticket_status
	 */
	public String getTicket_status() {
		return ticket_status;
	}

	/**
	 * @param ticket_status the ticket_status to set
	 */
	public void setTicket_status(String ticket_status) {
		this.ticket_status = ticket_status;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Ticket [ticket_id=" + ticket_id + ", season_id=" + season_id + ", ticket_seat_id=" + ticket_seat_id
				+ ", user_id=" + user_id + ", ticket_status=" + ticket_status + "]";
	}
	
	//test
	public static void main(String[] args) {
		Ticket ticket = new Ticket();
		String result = ticket.toString();
		System.out.println(result);
	}
}
