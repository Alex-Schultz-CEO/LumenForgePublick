<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

echo 'Файл send-mail.php запущен!';


require __DIR__ . '/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Метод не разрешён');
}

$name     = $_POST['name'] ?? '';
$email    = $_POST['email'] ?? '';
$phone    = $_POST['phone'] ?? '';
$company  = $_POST['company'] ?? '';
$message  = $_POST['message'] ?? '';

if (!$name || !$email || !$message) {
    exit('Не все обязательные поля заполнены.');
}

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'Magistervovchenko86@gmail.com';
    $mail->Password   = 'qpae tyit xtna ttzr';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('Magistervovchenko86@gmail.com', 'Форма с сайта');
    
    // Добавляем оба адреса
    $mail->addAddress('ulugbekkdirov98@gmail.com', 'Отдел продаж');
    $mail->addBCC('whitedemon200217@gmail.com', 'Отдел продаж');; // Второй получатель

    // Или используйте слепую копию (получатели не увидят друг друга)
    // 

    $mail->Subject = 'Новой запрос с сайта';
    $mail->Body    = "Имя: $name\nEmail: $email\nТелефон: $phone\nКомпания: $company\n\nСообщение:\n$message";

    if (!empty($_FILES['file']['tmp_name'])) {
        $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
    }
    
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->send();
    echo 'Спасибо! Ваше сообщение отправлено.';
} catch (Exception $e) {
    echo "Ошибка при отправке: {$mail->ErrorInfo}";
}