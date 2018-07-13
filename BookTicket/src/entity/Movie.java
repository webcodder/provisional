package entity;

/**
 * 
 * @param ��Ӱ��
 * @author zmx2321
 *
 */
public class Movie {
	private int movie_id = 0;  //��Ӱid
	private String movie_name = null;  //��Ӱ��
	private String movie_performer = null;  //��Ա
	private String movie_length = null;  //ʱ��
	private String movie_type = null;  //���� 
	private String movie_time = null;  //��ӳʱ�� 
	private int movie_score = 0;  //����
	private String movie_info = null;  //���
	
	//��Ӱ��Ϣ1
	public Movie() {}

	//��Ӱ��Ϣ2
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

	//��Ӱ��Ϣ3
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
		return "��Ӱ��ţ�" + movie_id + ", \n��Ӱ���ƣ�" + movie_name + ", \n��Ա��" + movie_performer
				+ ", \nʱ����" + movie_length + ", \n��Ӱ���ͣ�" + movie_type + ", \n��ӳʱ�䣺" + movie_time
				+ ", \n���֣�" + movie_score + ", \n��Ӱ��飺" + movie_info + "\n";
	}
	
	//test
	public static void main(String[] args) {
		Movie movie = new Movie();
		String result = movie.toString();
		System.out.println(result);
	}
}
