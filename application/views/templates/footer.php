</div>
</div>
<footer class="container-fluid">
  <p>Footer Text</p>
</footer>
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