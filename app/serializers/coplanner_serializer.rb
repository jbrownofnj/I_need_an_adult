class CoplannerSerializer < ActiveModel::Serializer
  attributes :id, :shower_user_id, :viewer_user_id, :viewer_has_been_validated, :confirmation_token
end
