/*
 * Copyright 2016 Alexandre Terrasa <alexandre@moz-code.org>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	angular
		.module('docdown', ['model', 'ngSanitize'])

		.controller('DocdownCtrl', ['$routeParams', '$sce', '$scope', '$location', 'DocDown', function($routeParams, $sce, $scope, $location, DocDown) {

			this.updateSnippet = function() {
				this.updateLink();
				this.updateHtml();
			}

			this.updateLink = function() {
				$scope.link = $location.protocol()+ '://' + $location.host() + ':' +
					$location.port() + $location.path() + '?snippet=' +
					encodeURIComponent(btoa($scope.markdown));
			}

			this.updateHtml = function() {
				DocDown.postMarkdown($scope.markdown,
					function(data) {
						$scope.html = $sce.trustAsHtml(data);
					}, function(err) {
						$scope.error = err;
					});
			};

			this.editMode = function(isEdit) {
				$scope.edit = isEdit;
			}

			$scope.markdown = 'Type some markdown...';
			if($location.search().snippet) {
				$scope.markdown = atob($location.search().snippet);
			}
			$scope.edit = false;
			if($location.search().edit) {
				$scope.edit = Boolean($location.search().edit);
			}

			this.updateSnippet();
		}])
})();
