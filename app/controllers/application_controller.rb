class ApplicationController < ActionController::Base
  layout :layout_by_ressource
  protect_from_forgery
  
  protected
  def layout_by_ressource
    if devise_controller?
      'index_layout'
    else
      'application'
    end
  end
end
