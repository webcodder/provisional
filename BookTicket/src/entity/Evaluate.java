package entity;

/**
 * 
 * @param 评论类
 * @author zmx2321
 *
 */

public class Evaluate {
	private int evaluate_id = 0;  //评论id
	private String evaluate_content = null;  //评论内容
	private int movie_id = 0;  //电影id
	private int evaluate_time = 0;  //评论时间
	private int user_id = 0;  //用户id
	
	//评论信息1
	public Evaluate() {}

	//评论信息2
	public Evaluate(int evaluate_id, String evaluate_content, int movie_id, int evaluate_time, int user_id) {
		super();
		this.evaluate_id = evaluate_id;
		this.evaluate_content = evaluate_content;
		this.movie_id = movie_id;
		this.evaluate_time = evaluate_time;
		this.user_id = user_id;
	}

	//评论信息3
	public Evaluate(String evaluate_content, int movie_id, int evaluate_time, int user_id) {
		super();
		this.evaluate_content = evaluate_content;
		this.movie_id = movie_id;
		this.evaluate_time = evaluate_time;
		this.user_id = user_id;
	}

	/**
	 * @return the evaluate_id
	 */
	public int getEvaluate_id() {
		return evaluate_id;
	}

	/**
	 * @param evaluate_id the evaluate_id to set
	 */
	public void setEvaluate_id(int evaluate_id) {
		this.evaluate_id = evaluate_id;
	}

	/**
	 * @return the evaluate_content
	 */
	public String getEvaluate_content() {
		return evaluate_content;
	}

	/**
	 * @param evaluate_content the evaluate_content to set
	 */
	public void setEvaluate_content(String evaluate_content) {
		this.evaluate_content = evaluate_content;
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
	 * @return the evaluate_time
	 */
	public int getEvaluate_time() {
		return evaluate_time;
	}

	/**
	 * @param evaluate_time the evaluate_time to set
	 */
	public void setEvaluate_time(int evaluate_time) {
		this.evaluate_time = evaluate_time;
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

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Evaluate [evaluate_id=" + evaluate_id + ", evaluate_content=" + evaluate_content + ", movie_id="
				+ movie_id + ", evaluate_time=" + evaluate_time + ", user_id=" + user_id + "]";
	}
	
	//test
	public static void main(String[] args) {
		Evaluate evaluate = new Evaluate();
		String result = evaluate.toString();
		System.out.println(result);
	}
}
