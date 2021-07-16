require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-code-fly"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.library        = 'z'
  s.preserve_paths = '*.js'

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/shadow-boy/react-native-code-fly/react-native-code-fly.git", :tag => "#{s.version}" }

  s.source_files = "ios/CodeFly/*.{h,m}"

  s.dependency "React-Core"
  s.dependency 'SSZipArchive', '~> 2.2.2'
  s.dependency 'Base64', '~> 1.1'


end
