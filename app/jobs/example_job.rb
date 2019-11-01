class ExampleJob < ApplicationJob
  queue_as :default

  def perform(string)
    puts string
  end
end
