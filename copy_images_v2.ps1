$files = Get-ChildItem "D:\Pagina Perfuemeria Aero\imagenes" -Filter "*.jpeg"
$dest = "D:\Pagina Perfuemeria Aero\public\images\products"
$i = 1
foreach ($file in $files) {
    $newName = "product-$i.jpg"
    $newPath = Join-Path $dest $newName
    Copy-Item $file.FullName $newPath
    Write-Output "Copied $newName"
    $i++
}
