			</main>
		</div>
	</div>
	<footer class="container-fluid">
	  	<p>Footer Text</p>
	</footer>
	<script src="../assets/js/jquery-3.2.1.min.js"></script>	
	<script src="../assets/js/jquery-ui.js"></script>
	<script src="../assets/js/popper.min.js"></script>	
	<script src="../assets/bootstrap/js/bootstrap.min.js"></script>	
	<?php
		if (isset($javascript) && !empty($javascript)) {
			if (is_array($javascript)) {
				foreach ($javascript as $src) {
					echo ' <script src="' . $src . '"></script>';
					echo "\n";
				}
			} else {
				echo "\n";
				echo ' <script src="' . $javascript . '"></script>';
			}
		}
	?> 
</body>
</html>