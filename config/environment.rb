# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
app_env_vars = File.join(Rails.root, 'config', 'initializers', 'app_env_vars.rb')
load(app_env_vars) if File.exists?(app_env_vars)
Rails.application.initialize!
