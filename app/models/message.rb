class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :content, presence: true, unless: :image?
          # contentカラムが空の場合は保存しない
  mount_uploader :image, ImageUploader

end
