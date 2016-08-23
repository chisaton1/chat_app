class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_filter :set_request_from

  # どこのページからリクエストが来たか保存しておく
  def set_request_from
    if session[:request_from]
      @request_from = session[:request_from]
    end
    # 現在のURLを保存しておく
    session[:request_from] = request.original_url
  end

  # 前の画面に戻る
  def return_back
    if request.referer
      redirect_to :back and return true
    elsif @request_from
      redirect_to @request_from and return true
    end
  end

  def after_sign_in_path_for(resource)
    # 既にログインしていたら(current_userがnullじゃなければ)チャットページに飛ばす
    if current_user
      current_user
    else
      user_path(@user)
    end
  end

  def after_sign_out_path_for(resource)
    new_user_session_path
  end

  private
    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :name
    end
end
