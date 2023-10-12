class User < ApplicationRecord
     has_one :pantry

     validates :auth0_id, presence: true
     validates :name, presence: true
     validates :email, presence: true

     after_create :create_pantry

     def self.from_user_id(user_id)
          # user_id comes back as this :extra => {
#    :raw_info => {
#      :email => 'johnfoo@example.org',
#      :email_verified => 'true',
#      :name => 'John Foo',
#      :picture => 'https://example.org/john.jpg',
#      :user_id => 'auth0|USER_ID',
#      :nickname => 'john',
#      :created_at => '2014-07-15T17:19:50.387Z'
#    } and i need to create a new user with the user_id, the email and the name
          user = User.find_or_create_by(auth0_id: user_id) do |user|
               user.name = user_id
               user.email = user_id
          end
     end

     private

     def create_pantry
          Pantry.create(user: self)
     end
end