$sourcePath = "D:\Pagina Perfuemeria Aero\imagenes"
$destPath = "D:\Pagina Perfuemeria Aero\public\images\products"

# Ensure destination exists
if (!(Test-Path $destPath)) {
    New-Item -ItemType Directory -Force -Path $destPath
}

$i = 1
Get-ChildItem -Path $sourcePath -Filter "*.jpeg" | ForEach-Object {
    $newName = "product-$i.jpg"
    $newPath = Join-Path $destPath $newName
    Write-Host "Copying $($_.Name) to $newName"
    Copy-Item -LiteralPath $_.FullName -Destination $newPath
    $i++
}
