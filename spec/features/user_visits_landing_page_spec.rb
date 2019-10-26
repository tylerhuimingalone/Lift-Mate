require 'rails_helper'

feature 'user visits landing page' do
  scenario 'user is not signed in and visits page' do
    visit '/'
    expect(page).to have_content('Welcome To')
    expect(page).to have_content('Lift-Mate')
  end
end
