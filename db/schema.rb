# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_20_150915) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coplanners", force: :cascade do |t|
    t.integer "shower_user_id", null: false
    t.integer "viewer_user_id", null: false
    t.boolean "viewer_has_been_validated", default: false
    t.string "confirmation_token", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shower_user_id"], name: "index_coplanners_on_shower_user_id"
    t.index ["viewer_user_id"], name: "index_coplanners_on_viewer_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "event_name"
    t.string "event_description"
    t.string "event_location"
    t.string "event_contact"
    t.datetime "event_start"
    t.datetime "event_end"
    t.boolean "private", default: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_events_on_user_id"
  end

  create_table "preperations", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_preperations_on_event_id"
    t.index ["task_id"], name: "index_preperations_on_task_id"
  end

  create_table "prereqs", force: :cascade do |t|
    t.integer "independent_task_id", null: false
    t.integer "prereq_task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["independent_task_id"], name: "index_prereqs_on_independent_task_id"
    t.index ["prereq_task_id"], name: "index_prereqs_on_prereq_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "task_name"
    t.string "task_description"
    t.string "task_location"
    t.string "task_contact"
    t.datetime "task_due_date"
    t.integer "task_duration"
    t.boolean "private"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", null: false
    t.float "color_coefficient", default: 1.0
    t.string "user_email", null: false
    t.boolean "email_validated", default: false
    t.string "confirmation_token", default: ""
    t.string "password_digest", null: false
    t.boolean "is_admin", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "events", "users"
  add_foreign_key "preperations", "events"
  add_foreign_key "preperations", "tasks"
  add_foreign_key "tasks", "users"
end
