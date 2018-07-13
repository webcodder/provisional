package entity;

/**
 * 
 * @param 电影类
 * @author zmx2321
 *
 */
public class Movie {
	private int movie_id = 0;  //电影id
	private String movie_name = null;  //电影名
	private String movie_performer = null;  //演员
	private String movie_length = null;  //时长
	private String movie_type = null;  //类型 
	private String movie_time = null;  //上映时间 
	private int movie_score = 0;  //评分
	private String movie_info = null;  //简介
	
	//电影信息1
	public Movie() {}

	//电影信息2
	public Movie(int movie_id, String movie_name, String movie_performer, String movie_length, String movie_type,
			String movie_time, int movie_score, String movie_info) {
		this.movie_id = movie_id;
		this.movie_name = movie_name;
		this.movie_performer = movie_performer;
		this.movie_length = movie_length;
		this.movie_type = movie_type;
		this.movie_time = movie_time;
		this.movie_score = movie_score;
		this.movie_info = movie_info;
	}

	//电影信息3
	public Movie(String movie_name, String movie_performer, String movie_length, String movie_type, String movie_time,
			int movie_score, String movie_info) {
		super();
		this.movie_name = movie_name;
		this.movie_performer = movie_performer;
		this.movie_length = movie_length;
		this.movie_type = movie_type;
		this.movie_time = movie_time;
		this.movie_score = movie_score;
		this.movie_info = movie_info;
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
	 * @return the movie_name
	 */
	public String getMovie_name() {
		return movie_name;
	}

	/**
	 * @param movie_name the movie_name to set
	 */
	public void setMovie_name(String movie_name) {
		this.movie_name = movie_name;
	}

	/**
	 * @return the movie_performer
	 */
	public String getMovie_performer() {
		return movie_performer;
	}

	/**
	 * @param movie_performer the movie_performer to set
	 */
	public void setMovie_performer(String movie_performer) {
		this.movie_performer = movie_performer;
	}

	/**
	 * @return the movie_length
	 */
	public String getMovie_length() {
		return movie_length;
	}

	/**
	 * @param movie_length the movie_length to set
	 */
	public void setMovie_length(String movie_length) {
		this.movie_length = movie_length;
	}

	/**
	 * @return the movie_type
	 */
	public String getMovie_type() {
		return movie_type;
	}

	/**
	 * @param movie_type the movie_type to set
	 */
	public void setMovie_type(String movie_type) {
		this.movie_type = movie_type;
	}

	/**
	 * @return the movie_time
	 */
	public String getMovie_time() {
		return movie_time;
	}

	/**
	 * @param movie_time the movie_time to set
	 */
	public void setMovie_time(String movie_time) {
		this.movie_time = movie_time;
	}

	/**
	 * @return the movie_score
	 */
	public int getMovie_score() {
		return movie_score;
	}

	/**
	 * @param movie_score the movie_score to set
	 */
	public void setMovie_score(int movie_score) {
		this.movie_score = movie_score;
	}

	/**
	 * @return the movie_info
	 */
	public String getMovie_info() {
		return movie_info;
	}

	/**
	 * @param movie_info the movie_info to set
	 */
	public void setMovie_info(String movie_info) {
		this.movie_info = movie_info;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "电影序号：" + movie_id + ", \n电影名称：" + movie_name + ", \n演员：" + movie_performer
				+ ", \n时长：" + movie_length + ", \n电影类型：" + movie_type + ", \n上映时间：" + movie_time
				+ ", \n评分：" + movie_score + ", \n电影简介：" + movie_info + "\n";
	}
	
	//test
	public static void main(String[] args) {
		Movie movie = new Movie();
		String result = movie.toString();
		System.out.println(result);
	}
}
