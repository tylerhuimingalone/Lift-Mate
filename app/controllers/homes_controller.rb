class HomesController < ApplicationController
  def index
    if !user_signed_in?
      redirect_to :new_user_session
    end
  end
end
