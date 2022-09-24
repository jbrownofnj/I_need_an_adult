
john=User.create!(user_name:"John Brown", color_coefficient:1, user_email:"johnbrownsinbox@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)
lisa=User.create!(user_name:"lisa Cohen", color_coefficient:1, user_email:"lisa@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)
bobby=User.create!(user_name:"Bobby boberson", color_coefficient:2, user_email:"bobby@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)
janet=User.create!(user_name:"Janet", color_coefficient:2, user_email:"janet@gmail.com", password:"!@QW12qw",is_admin:false, confirmation_token:"",email_validated: true)

bobby_lets_john_view=Coplanner.create!(shower_user: bobby,viewer_user: john,confirmation_token:"",viewer_has_been_validated: true)
janet_lets_john_view=Coplanner.create!(shower_user: janet,viewer_user: john, confirmation_token:"",viewer_has_been_validated: true)
lisa_lets_john_view=Coplanner.create!(shower_user: lisa,viewer_user: john, confirmation_token:"",viewer_has_been_validated: true)
bobby_lets_lisa_view=Coplanner.create!(shower_user: bobby,viewer_user: lisa,confirmation_token:"",viewer_has_been_validated: true)
janet_lets_lisa_view=Coplanner.create!(shower_user: janet,viewer_user: lisa, confirmation_token:"",viewer_has_been_validated: true)
john_lets_lisa_view=Coplanner.create!(shower_user: john,viewer_user: lisa, confirmation_token:"",viewer_has_been_validated: true)
john_lets_bobby_view=Coplanner.create!(shower_user: john,viewer_user: bobby,confirmation_token:"",viewer_has_been_validated: true)
janet_lets_bobby_view=Coplanner.create!(shower_user: janet,viewer_user: bobby, confirmation_token:"",viewer_has_been_validated: true)
lisa_lets_bobby_view=Coplanner.create!(shower_user: lisa,viewer_user: bobby, confirmation_token:"",viewer_has_been_validated: true)
bobby_lets_janet_view=Coplanner.create!(shower_user: bobby,viewer_user: janet,confirmation_token:"",viewer_has_been_validated: true)
john_lets_janet_view=Coplanner.create!(shower_user: john,viewer_user: janet, confirmation_token:"",viewer_has_been_validated: true)
lisa_lets_janet_view=Coplanner.create!(shower_user: lisa,viewer_user: janet, confirmation_token:"",viewer_has_been_validated: true)

clean_car=Task.create!(task_name:"Clean my car", task_description:"That car is filthy man get at it", task_location:"Home", task_contact:"Me", task_duration:45, user:john, task_due_date:DateTime.new(2022,5,30))
buy_cat_tree=Task.create!(task_name:"Get Cat Tree",task_description:"Buy a nice cat tree",task_location:"Home",task_contact:"Crazy Cat lady",task_duration:30,user:john, task_due_date:DateTime.new(2022,6,1))
call_kendra=Task.create!(task_name:"Call Kendra",task_description:"Ask about jobs in the field",task_location:"Home",task_contact:"Kendra",task_duration:45,user:john, task_due_date:DateTime.new(2022,6,4))
research_cat_tree=Task.create!(task_name:"Reseach Cat Trees", task_description:"A deep dive on the internet", task_location:"Home", task_contact:"Google", task_duration:160, user:john, task_due_date:DateTime.new(2022,6,14))
get_3d_printer=Task.create!(task_name:"Get 3D Printer",task_description:"insert justification here",task_location:"Home",task_contact:"Dave",task_duration:60,user:john, task_due_date:DateTime.new(2022,6,15))
finish_project=Task.create!(task_name:"Finish Project",task_description:"Full once over the whole thing",task_location:"Home",task_contact:"Sam",task_duration:4544,user:john, task_due_date:DateTime.new(2022,6,1))
eat_healthy=Task.create!(task_name:"Eat Healthy", task_description:"Suffering", task_location:"Everywhere", task_contact:"Satan", task_duration:4500000, user:john, task_due_date:DateTime.new(2060,12,31))

call_kendra_for_Kendra=Task.create!(task_name:"Call Kendra",task_description:"Ask about jobs in the field",task_location:"Home",task_contact:"Kendra",task_duration:45,user:lisa, task_due_date:DateTime.new(2022,6,4))
buy_cat_tree_for_Kendra=Task.create!(task_name:"Cat Tree",task_description:"Buy a nice cat tree",task_location:"Home",task_contact:"N/A",task_duration:30,user:lisa, task_due_date:DateTime.new(2022,6,1))

buy_cat_tree_before_clean_car=Prereq.create!(independent_task_id: clean_car.id, prereq_task_id: buy_cat_tree.id)
call_kendra_before_buy_cat_treer=Prereq.create!(independent_task_id: buy_cat_tree.id, prereq_task_id: call_kendra.id)
call_kendra_before_buy_cat_treer=Prereq.create!(independent_task_id: buy_cat_tree_for_Kendra.id, prereq_task_id: call_kendra_for_Kendra.id)

do_project_john=Event.create!(user:john, event_name:"Do Project", event_description:"All of it",event_location:"Home", event_contact:"Me", event_start: DateTime.parse("29 September 2022"),event_end: DateTime.parse("30 September 2022"))
beach_weekend_for_john=Event.create!(user:janet, event_name:"Beach Weekend", event_description:"Long weekend with the family",event_location:"NJ shore", event_contact:"Jean Brown", event_start: DateTime.parse("23 September 2022"),event_end: DateTime.parse("25 September 2022"))
job_search_for_john=Event.create!(user:john, event_name:"Find Job", event_description:"Get Job",event_location:"Home", event_contact:"Me", event_start: DateTime.parse("22 September 2022"),event_end: DateTime.parse("30 September 2022"))
ponder_existentially=Event.create!(user:bobby, event_name:"Ponder the Meaning of it all", event_description:"Do it",event_location:"Home", event_contact:"Me", event_start: DateTime.parse("20 September 2022"),event_end: DateTime.parse("30 September 2022") )
play_soccer=Event.create!(user:lisa, event_name:"Play Soccer", event_description:"Fun fun",event_location:"School", event_contact:"Coach Fran", event_start: DateTime.parse("15 September 2022"),event_end: DateTime.parse("20 September 2022") )

buy_cat_tree_before_beach_weekend=Preperation.create!(task_id:buy_cat_tree.id,event_id:beach_weekend_for_john.id)

puts "YOU SEEDED! WOO"


