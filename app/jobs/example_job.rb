class ExampleJob < ApplicationJob
  queue_as :default

  def perform
    puts "Test successful"
  end
end
