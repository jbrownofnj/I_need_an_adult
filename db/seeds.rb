
john=User.create!(user_name:"John Brown", color_coefficient:1, user_email:"johnbrownsinbox@gmail.com", password:"!@QW12qw",is_admin:true, confirmation_token:"",email_validated: true)
cassandra=User.create!(user_name:"Cassandra Cohen", color_coefficient:1, user_email:"cplcohen@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)
bobby=User.create!(user_name:"Bobby Whocares", color_coefficient:2, user_email:"noonelikesbobby@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)
bully_buster=User.create!(user_name:"The Bully Buster", color_coefficient:2, user_email:"antibullysuperhero@gmail.com", password:"notbobbywhocharress",is_admin:false, confirmation_token:"")
#bobby_lets_bully_buster_view=Coplanner.create!(shower_user_id: bobby.id,viewer_user_id: bully_buster.id,viewer_has_been_validated: false, confirmation_token:"")
##bobby_lets_cassandra_view=Coplanner.create!(shower_user_id: bobby.id,viewer_user_id: cassandra.id,viewer_has_been_validated: false, confirmation_token:"")
bobby_lets_john_view=Coplanner.create!(shower_user_id: bobby.id,viewer_user_id: john.id,viewer_has_been_validated: false, confirmation_token:"")
#john_lets_bobby_view=Coplanner.create!(shower_user_id: john.id,viewer_user_id: bobby.id,viewer_has_been_validated: false, confirmation_token:"")
clean_car=Task.create!(task_name:"clean my car", task_description:"That car is filthy man get at it", task_location:"Home", task_contact:"Me", task_duration:45, user:john, task_due_date:DateTime.new(2022,5,30.5))
buy_cat_tree=Task.create!(task_name:"Cat Tree",task_description:"Buy a nice cat tree",task_location:"Home",task_contact:"N/A",task_duration:30,user:john, task_due_date:DateTime.new(2022,6,1))
call_kendra=Task.create!(task_name:"Call Kendra",task_description:"Ask about jobs in the field",task_location:"Home",task_contact:"Kendra",task_duration:45,user:john, task_due_date:DateTime.new(2022,6,4))
buy_cat_tree_before_clean_car=Prereq.create!(independent_task_id: clean_car.id, prereq_task_id: buy_cat_tree.id)
call_kendra_before_buy_cat_treer=Prereq.create!(independent_task_id: buy_cat_tree.id, prereq_task_id: call_kendra.id)
beach_weekend_for_john=Event.create!(user:john, event_name:"Beach Weekend", event_description:"Long weekend with the family",event_location:"NJ shore", event_contact:"Jean Brown", event_start: DateTime.parse("5 June 2022"),event_end: DateTime.parse("8 June 2022"))
job_search_for_john=Event.create!(user:john, event_name:"Find Job", event_description:"Get Job",event_location:"Home", event_contact:"Me", event_start: DateTime.parse("1 June 2022"),event_end: DateTime.parse("8 June 2022"))
job_search_for_bobby=Event.create!(user:bobby, event_name:"Find Word", event_description:"Get Job",event_location:"Home", event_contact:"Me", event_start: DateTime.parse("17 May 2022"),event_end: DateTime.parse("18 May 2022") )

buy_cat_tree_before_beach_weekend=Preperation.create!(task_id:buy_cat_tree.id,event_id:beach_weekend_for_john.id)

puts "YOU SEEDED! WOO"


