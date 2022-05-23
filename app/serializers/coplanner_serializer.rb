class CoplannerSerializer < ActiveModel::Serializer
  attributes :id, :shower_id, :viewer_id, :viewer_validated, :confimation_token
end
