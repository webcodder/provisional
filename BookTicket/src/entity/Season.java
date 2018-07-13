package entity;

/**
 * 
 * @param 场次类
 * @author zmx2321
 *
 */

public class Season {
	private int season_id = 0;  //场次id
	private int movie_id = 0;  //电影id
	private String season_time = null;  //放映时间
	private float season_price = 0;  //支付价格
	private int hall_id = 0;  //影厅id
	
	//场次信息1
	public Season() {}

	//场次信息2
	public Season(int season_id, int movie_id, String season_time, float season_price, int hall_id) {
		super();
		this.season_id = season_id;
		this.movie_id = movie_id;
		this.season_time = season_time;
		this.season_price = season_price;
		this.hall_id = hall_id;
	}

	//场次信息3
	public Season(int movie_id, String season_time, float season_price, int hall_id) {
		super();
		this.movie_id = movie_id;
		this.season_time = season_time;
		this.season_price = season_price;
		this.hall_id = hall_id;
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
	 * @return the movie_id
	 */
	public int getMovie_id() {
		return movie_id;
	}

	/**
	 * @param movie_id the movie_id to set
	 */
	public void setMovie_id(int movie_id) {
		this.movie_id = movie_id;
	}

	/**
	 * @return the season_time
	 */
	public String getSeason_time() {
		return season_time;
	}

	/**
	 * @param season_time the season_time to set
	 */
	public void setSeason_time(String season_time) {
		this.season_time = season_time;
	}

	/**
	 * @return the season_price
	 */
	public float getSeason_price() {
		return season_price;
	}

	/**
	 * @param season_price the season_price to set
	 */
	public void setSeason_price(float season_price) {
		this.season_price = season_price;
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

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Season [season_id=" + season_id + ", movie_id=" + movie_id + ", season_time=" + season_time
				+ ", season_price=" + season_price + ", hall_id=" + hall_id + "]";
	}
	
	//test
	public static void main(String[] args) {
		Season season = new Season();
		String result = season.toString();
		System.out.println(result);
	}
}
